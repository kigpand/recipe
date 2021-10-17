import { useEffect } from 'react';
import styled from 'styled-components';


const ItemWrapper = styled.div`
    .img{
        width:50px;
        height:50px;
    }
`;
const ListItem = ({ list }) =>{

    useEffect(()=>{
        console.log(list);
    },[list])

    return(
        <ItemWrapper>
            <img src={list.picture} alt="그림" className="img"/>
            <div className="info">
                <div className="name">{list.name}</div>
                <div className="sub">
                    <div className="cookingTime">{list.cookingTime}</div>
                    <div className=""></div>
                </div>
            </div>
        </ItemWrapper>
    )
}

export default ListItem;