import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuList from './MenuList';
import Recipy from './Recipy';

const MenuWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    .title{
        width: 100%;
        height: 200px;
        background-color: yellow;
        font-weight: bold;
        font-size: 1.5rem;
    }

    .main{
        width: 100%;
        height: 700px;
        overflow-y: auto;

        .recipe{
            width: 100%;
            height: 100vh;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            top: 0;
            left: 0;

            &:hover{
                cursor: pointer;
            }
        }

        .body{
            margin-top: 1rem;
        }
    }
`;
const Menu = () =>{

    const [onCategory, setOnCategory] = useState(false);
    const [onRecipe, setOnRecipe] = useState({ state: false, id: null });
    const [menuList, setMenuList] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe',
            headers: { 'Content-Type': 'application/json' },
          }).then((e)=>{
              setMenuList(e.data);
          }).catch((err)=>{
              console.log(err);
          })
    },[]);

    const onRecipeState = (data) =>{
        setOnRecipe({ state: true, id: data });
    }

    const onCategoryState = () =>{
        setOnCategory(!onCategory);
    }

    const onCloseRecipe = () =>{
        setOnRecipe({ state: false, id: null });
    }

    return (
        <MenuWrapper>
            <div className = "title">맛있는 요리</div>
            { menuList.length === 0 
            ? <div>로딩중</div> 
            : <div className="main">
                { onRecipe.state && <div className="recipe" onClick={onCloseRecipe}><Recipy id={onRecipe.id} /></div>}
                <div className= "body">
                    {onCategory
                        ? <div>카테고리별로 지정</div>
                        : <MenuList menuList={menuList} onRecipeState={onRecipeState}/>
                    }
                </div>
            </div>
            }           
        </MenuWrapper>
    )
}

export default Menu;