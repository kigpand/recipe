import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const RecipyWrapper = styled.div`

    width: 100%;
    height: 100vh;

    .main{
        display: flex;
        flex-direction: column;
        align-items: center;

        .img{
            width: 500px;
            height: 400px;
        }

        .info{
            width: 500px;
            background-color: white;

            .infoTitle{
                padding: 1rem;
                font-size: 1.2rem;
                font-weight: bold;
            }

            .infoContent{
                padding: 1rem;
                font-size: 0.8rem;
                font-weight: bold;
                color: gray;
            }

            .infoSub{
                display: flex;
                align-items: center;
                justify-content: center;

                .subContent{
                    text-align: center;
                    padding: 1rem;
                    width: 200px;
                    border: 1px solid lightgray;
                }
            }
        }

        .recipySub{
            width: 500px;
            background-color: white;

            .recipySubTitle{
                padding: 1rem 1rem 0 1rem;
                font-size: 1.2rem;
            }

            .recipySubList{
                padding: 1rem;
            }

            .listNum{
                margin-bottom: 0.5rem;
                width: 10px;
                height: 10px;
                background-color: yellow;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .listItem{
                margin-bottom: 1rem;
            }
        }
    }
`;
const Recipy = ({ id }) =>{

    const [recipy, setRecipy] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        axios({
            method: 'get',
            url: `https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe/${id}`,
            headers: { 'Content-Type': 'application/json' },
          }).then((e)=>{
              setRecipy({...e.data});
              setLoading(false)
          }).catch((err)=>{
              console.log(err);
          });
    },[id])

    return (
        <RecipyWrapper>
            { loading 
            ? <div>로딩중</div>
            : <div className="main">
                <img src={recipy.picture} alt="사진" className="img" />
                <div className="info">
                    <div className="infoTitle">{recipy.name}</div>
                    <p className="infoContent">{recipy.description}</p>
                    <div className="infoSub">
                        <div className="subContent">{recipy.cookingTime}분 | {recipy.servings}인분 | {recipy.kcal}kcal</div>
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">재료</div>
                    <div className="recipySubList">
                        { recipy.ingredients.map((ingredient)=>{
                            return <div className="listItem">{ingredient}</div>
                        })}
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">양념장</div>
                    <div className="recipySubList">
                        { recipy.spices.map((spice)=>{
                            return <div className="listItem">{spice}</div>
                        })}
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">만들어 봅시다</div>
                    <div className="recipySubList">
                        { recipy.cookingSteps.map((step, i)=>{
                            return (
                                <div>
                                    <div className="listNum">{i + 1}</div>
                                    <div className="listItem">{step}</div>
                                </div>)
                        })}
                    </div>
                </div>
              </div>
            }
        </RecipyWrapper>
    )
}

export default Recipy;