import React from 'react';
import { View,Text,Image, Dimensions } from 'react-native';
import { IStatisticsResponse } from '../../utils/graphql/query/statistics/IStatisticsResponse';
import { IStastistics } from '../../api/firebase/stastics';

// import { Container } from './styles';
interface IStatisticsProps{
  statistics : IStastistics[],
  homeTeamId : string
}
const Statistics: React.FC<IStatisticsProps> = ({statistics,homeTeamId}) => {

  // const screenWidth = Dimensions.get('window').width; // Get the screen width dynamically
  // const padding = 18; // Adjust this value as per your `padding` styles
  // const containerWidth = screenWidth - padding; 

  const types = [
    {
     type:"Ball Possession",
     name:"Posse de Bola (%)",
    },
    {
      type:"expected_goals",
      name:"Golos Esperados",
     },
     {
      type:"Shots on Goal",
      name:"Remates à baliza",
     },
     {
      type:"Shots off Goal",
      name:"Remates não enquadrados"
     },
     {
      type:"Offsides",
      name:"Fora de Jogo"
     },
     {
      type:"Corner Kicks",
      name:"Cantos"
     },
     {
      type:"Fouls",
      name:"Faltas"
     },
     {
      type:"Yellow Cards",
      name:"Cartão amarelo"
     },
     {
      type:"Red Cards",
      name:"Cartão vermelho"
    }
  ]
  console.log(statistics)
  return <View  className='flex flex-col w-full pr-9 mt-4 h-full'>
    {types.map(x=>{
      let homeValue = "0"
      let awayValue = "0"
      try {
         homeValue = statistics?.filter(k=>Number(k?.team.api) === Number(homeTeamId) && String(k?.type) === String(x.type))[0].value
         awayValue = statistics?.filter(k=>Number(k?.team.api) !== Number(homeTeamId) && k?.type === x.type)[0].value
      } catch (error) {
        
      }
      return (
        <View className='justify-between flex-row w-full  border-b mb-4  border-b-white_20 pb-2'>
          <Text className={`text-white font-dinCondensed text-center text-xl leading-9 flex w-16 top-1 pl-2 h-12`}>{ homeValue !==  "null" ? homeValue : "0"}</Text>
          {x.name === "Cartão amarelo" ?
           <View className='flex-row gap-2 items-center'>
             <Image className='w-4' source={require('../../assets/icons/yellowcard.png')} ></Image>
            <Text className='text-white font-PoppinsMedium  text-md'>{x.name}</Text>
           </View>
          : x.name === "Cartão vermelho" ? 
          <View className='flex-row gap-2 items-center'>
          <Image className='w-4' source={require('../../assets/icons/redcard.png')} ></Image>
         <Text className='text-white font-PoppinsMedium text-md'>{x.name}</Text>
        </View>
          :  <Text className='text-white font-PoppinsMedium top-2 text-md'>{x.name}</Text>}
          <Text className='text-white font-dinCondensed text-center text-xl leading-9 w-16 pr-2 top-1'>{ awayValue !==  "null" ? awayValue : "0" }</Text>
       </View>
      )
    })}
    <View className='h-60'></View>
        
  </View>;
}

export default Statistics