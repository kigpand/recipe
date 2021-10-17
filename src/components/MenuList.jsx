import styled from 'styled-components';
import ListItem from './ListItem';

const ListWrapper = styled.div`

`;
const MenuList = ({ menuList }) =>{
    return(
        <ListWrapper>
            { menuList.map((list)=>{
                return <ListItem key={list.id} list={list} />
            })}
        </ListWrapper>
    )
}

export default MenuList;