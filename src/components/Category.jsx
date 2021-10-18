
import styled from 'styled-components';
import ListItem from './ListItem';

const CategoryWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .categoryTitle{
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: whitesmoke;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        padding-left : 0.5rem;
    }
`
const Category = ({ categoryList, onRecipeState }) =>{

    return(
        <CategoryWrapper>
            { categoryList.map((category, i)=>{
                return (
                    <div key={i}>
                        <div className="categoryTitle">{category.categoryTitle}</div>
                        {category.categoryArray.map((list)=>{
                            return <ListItem key={list.id} list={list} onRecipeState={onRecipeState}/>
                        })}
                    </div>
                )
            })}
        </CategoryWrapper>
    )
}

export default Category;