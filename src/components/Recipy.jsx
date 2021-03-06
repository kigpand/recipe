import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TIMEICON from '../imgs/time.png';
import KCALICON from '../imgs/kcal.png';
import SERVINGICON from '../imgs/serving.png';
import PICKICON from '../imgs/check_full.png';
import LoadingSpinner from './LoadingSpinner';

const RecipyWrapper = styled.div`

    width: 500px;
    height: 100%;

    .recipyMain{
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        background-color: white;

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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    width: 300px;
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
                display: flex;
                align-items: center;
                margin-bottom: 1rem;

                span{
                    margin-right: 0.3rem;
                }
            }
        }
    }

    @media screen and (max-width:1023px) {
    }
        
    @media screen and (max-width:767px) {
        .recipyMain{
            .img{
                width: 100%;
                height: 300px;
            }

            .info{
                width: 100%;
            }

            .recipySub{
                width: 100%;
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
            ? <LoadingSpinner />
            : <div className="recipyMain">
                <img src={recipy.picture} alt="??????" className="img" />
                <div className="info">
                    <div className="infoTitle">{recipy.name}</div>
                    <p className="infoContent">{recipy.description}</p>
                    <div className="infoSub">
                        <div className="subContent">
                            <img src={TIMEICON} alt="?????????" className="subContentIcon"/>{recipy.cookingTime}??? | 
                            <img src={SERVINGICON} alt="?????????" className="subContentIcon"/>{recipy.servings}?????? | 
                            <img src={KCALICON} alt="?????????" className="subContentIcon"/>{recipy.kcal}kcal
                        </div>
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">??????</div>
                    <div className="recipySubList">
                        { recipy.ingredients.map((ingredient, i)=>{
                            return (
                                <div key={i} className="listItem">
                                    <span className="icon"><img src={PICKICON} alt="?????????" /></span>{ingredient}
                                </div>);
                        })}
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">?????????</div>
                    <div className="recipySubList">
                        { recipy.spices.map((spice, i)=>{
                            return (
                                <div key={i} className="listItem">
                                    <span className="icon"><img src={PICKICON} alt="?????????" /></span>{spice}
                                </div>);
                        })}
                    </div>
                </div>
                <div className="recipySub">
                    <div className="recipySubTitle">????????? ?????????</div>
                    <div className="recipySubList">
                        { recipy.cookingSteps.map((step, i)=>{
                            return (
                                <div key={i}>
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