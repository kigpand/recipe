import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Category from './Category';
import LoadingSpinner from './LoadingSpinner';
import MenuList from './MenuList';
import Recipy from './Recipy';

const MenuWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    .recipe{
        z-index: 1;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;

        &:hover{
            cursor: pointer;
        }
    }

    .title{
        width: 100%;
        height: 200px;
        background-color: yellow;
        font-weight: bold;
        font-size: 1.5rem;
        position: relative;

        .CateGoryBtn{
            font-size: 0.8rem;
            padding: 0.5rem;
            border: 1px solid gray;
            border-radius: 8px;
            position: absolute;
            right: 20px;
            bottom: 20px;

            &:hover{
                cursor: pointer;
                background-color: lightgray;
            }
        }
    }

    .main{
        width: 100%;
        height: 700px;
        overflow-y: auto;

        .body{
            margin-top: 1rem;
        }
    }
`;
const Menu = () =>{

    const [onCategory, setOnCategory] = useState(false);
    const [onRecipe, setOnRecipe] = useState({ state: false, id: null });
    const [menuList, setMenuList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const ascending = (a, b) =>{
        return a.name < b.name ? -1 : (a.name === b.name) ? 0 : 1;
    }

    // 카테고리 List를 따로 생성하여 해당하는 Category의 배열들만 집합시켜 정렬하는 함수입니다.
    const getCategoryList = (menu) =>{
        const categoryTotal = [];
        menu.map((list)=>{
            const result = categoryTotal.find((category) => category.categoryTitle === list.category);
            if(result === undefined){
                console.log("테스트")
                const categoryArray = menu.filter((category) => category.category === list.category);
                categoryTotal.push({ categoryTitle: list.category, categoryArray: categoryArray });
            }
        });

        categoryTotal.map((lists)=>{
            lists.categoryArray.sort(ascending);
            return lists;
        });
        
        setCategoryList([...categoryTotal]);
    }

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe',
            headers: { 'Content-Type': 'application/json' },
          }).then((e)=>{
              setMenuList(e.data);
              getCategoryList(e.data);
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
            { onRecipe.state && <div className="recipe" onClick={onCloseRecipe}><Recipy id={onRecipe.id} /></div>}
            <div className = "title">
                맛있는 요리
                <div className="CateGoryBtn" onClick={onCategoryState}>{ onCategory ? "전체 보기" : "카테고리 별로 보기" }</div>
            </div>
            { menuList.length === 0 
            ? <LoadingSpinner />
            : <div className="main">
                <div className= "body">
                    {onCategory
                        ? <Category categoryList={categoryList} onRecipeState={onRecipeState}/>
                        : <MenuList menuList={menuList} onRecipeState={onRecipeState}/>
                    }
                </div>
            </div>
            }           
        </MenuWrapper>
    )
}

export default Menu;