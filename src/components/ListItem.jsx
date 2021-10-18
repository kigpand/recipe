import styled from 'styled-components';


const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .line{
        margin: 1rem 0;
        width: 700px;
        height: 2px;
        background-color: lightgray;
    }

    .items{
        &:hover{
            cursor: pointer;
            background-color: lightgray;
        }

        width: 700px;
        display: flex;
        border-radius: 20px;

        .img{
            width:200px;
            height:200px;
            border-radius: 20px;
        }
    
        .info{
            margin: 3rem 0 0 1rem;
            .name{
                font-weight: bold;
                font-size: 1.5rem;
            }
        }

        .sub{
            margin-top: 2rem;
            display: flex;

            .kcal{
                margin-left: 1rem;
            }
        }
    }
`;
const ListItem = ({ list, onRecipeState }) =>{

    const onCategory = () =>{
        onRecipeState(list.id);
    }

    return(
        <ItemWrapper>
            <div className="items" onClick={onCategory}>
                <img src={list.picture} alt="그림" className="img"/>
                <div className="info">
                    <div className="name">{list.name}</div>
                    <div className="sub">
                        <div className="cookingTime">{list.cookingTime}</div>
                        <div className="kcal">{list.kcal}</div>
                    </div>
                </div>
            </div>
            <div className="line"></div>
        </ItemWrapper>
    )
}

export default ListItem;