import styled from 'styled-components';
import ListItem from './ListItem';

const ListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const MenuList = ({ menuList, onRecipeState }) =>{
    return(
        <ListWrapper>
            { menuList.map((list)=>{
                return <ListItem key={list.id} list={list} onRecipeState={onRecipeState}/>
            })}
        </ListWrapper>
    )
}

export default MenuList;