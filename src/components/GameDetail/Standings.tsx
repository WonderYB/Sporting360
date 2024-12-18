import React from 'react';
import { View,Text, ScrollView, Dimensions } from 'react-native';
import { IStatisticsResponse } from '../../utils/graphql/query/statistics/IStatisticsResponse';
import { IStandingsResponse } from '../../utils/graphql/query/standings/IStandingsResponse';
import { IStandings } from '../../api/firebase/standings';

const screenWidth = Dimensions.get('window').width;

// import { Container } from './styles';
interface IStandingsProps {
  standings: IStandings[]
}
const Standings: React.FC<IStandingsProps> = ({standings}) => {
  
  // const screenWidth = Dimensions.get('window').width; // Get the screen width dynamically
  // const padding = 18; // Adjust this value as per your `padding` styles
  // const containerWidth = screenWidth - padding; 

  const sortedStandings = standings.sort((a, b) => Number(a.rank) - Number(b.rank));
  return <View  className='flex flex-col w-screen pr-14 mt-4 h-full'>

     <View className='w-full flex-row ml-1 border-b mb-4  border-b-white_20 pb-2 mr-4'>
       <View className='w-52 flex-row'>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed'>#</Text>
         <Text className='text-lg ml-2 text-slate-400 top-1 font-dinCondensed'>EQUIPA</Text>
       </View>
       <View className='w-48 flex-row justify-center'>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-1/6'>J</Text>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-1/6'>V</Text>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-1/6'>E</Text>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-1/6'>D</Text>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-12 ml-3 '>G</Text>
         <Text className='text-lg text-slate-400 top-1 font-dinCondensed w-1/6'> P</Text>
       </View>
     </View>
     <ScrollView  contentContainerStyle={{marginLeft:0,marginBottom:40}}>
      {sortedStandings.length === 0 ? [] :sortedStandings.map(standing=>{
        return (
          <View className={`w-full pl-1 ${standing.team.name === "Sporting CP" && 'bg-titleauth pt-2 rounded-md'} border-b mb-4  border-b-white_20 pb-2 flex-row`}>
            <View className='w-52 flex-row items-center'>
              {standing.rank === "1" ?
                <View className='bg-primary rounded-full justify-center items-center w-7 h-7'>
                  <Text className='text-lg text-center top-1 text-white font-dinCondensed'>
                    {standing.rank}
                  </Text>
                </View>
              :
              standing.rank === "2" ? <View className='bg-gray-600 justify-center items-center rounded-full w-7 h-7'>
                  <Text className='text-lg text-white top-1 font-dinCondensed'>
                    {standing.rank}
                  </Text>
                </View>
              : standing.rank === "3" ? 
              <View className='bg-orange-900 rounded-full w-7 h-7 justify-center items-center'>
                  <Text className='text-lg text-white font-dinCondensed'>
                    {standing.rank}
                  </Text>
                </View>
              : <Text className='text-lg text-white ml-2 mr-3  top-1 font-dinCondensed'>
              {standing.rank}
              </Text> }
              <Text className='text-sm ml-2 text-white top font-dinBold'>{standing.team.name}</Text>
            </View>
            <View className='w-48 flex-row items-center justify-center'>
              <Text className='text-lg text-white top font-dinCondensed w-1/6'>{standing.played}</Text>
              <Text className='text-lg text-white top font-dinCondensed w-1/6'>{standing.win}</Text>
              <Text className='text-lg text-white top font-dinCondensed w-1/6'>{standing.draw}</Text>
              <Text className='text-lg text-white top font-dinCondensed w-1/6'>{standing.lose}</Text>
              <Text className='text-lg text-white top font-dinCondensed w-12 mr-4'> {standing.goalsfor}:{standing.goalsagainst}</Text>
              <Text className='text-lg text-white top font-dinCondensed w-1/6'>{standing.points}</Text>
            </View>
          </View>     
        )
      })}
      <View className='h-72'></View>
     </ScrollView>
        
  </View>;
}

export default Standings