import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuList from './MenuList';

const MenuWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    .title{
        width: 100%;
        height: 200px;
        background-color: yellow;
        font-weight: bold;
        font-size: 1.5rem;
    }

    .main{
        width: 100%;
        height: 100%;
        position: relative;

        .recipe{
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            top: 0;
            left: 0;
        }
    }
`;
const Menu = () =>{

    const [onCategory, setOnCategory] = useState(false);
    const [onRecipe, setOnRecipe] = useState(false);
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

    const onCategoryState = () =>{
        setOnCategory(!onCategory);
    }

    const onRecipeState = () =>{
        setOnRecipe(!onRecipe);
    }

    return (
        <MenuWrapper>
            <div className = "title">맛있는 요리</div>
            { menuList.length === 0 
            ? <div>로딩중</div> 
            : <div className="main">
                { onRecipe && <div className="recipe">레시피</div>}
                <div className= "body">
                    {onCategory 
                        ? <div>카테고리별로 지정</div>
                        : <MenuList menuList={menuList}/>
                    }
                </div>
            </div>
            }           
        </MenuWrapper>
    )
}

export default Menu;