import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View,Image,Text,ScrollView, Dimensions, TouchableOpacity, Linking, Platform, StatusBar } from 'react-native';
import { CLubLogos } from '../../constants/ClubsLogo';
import moment from 'moment-timezone';
import { getLocales, getCalendars } from 'expo-localization';
import { DateTime } from 'luxon';
interface IGame {
  competation: string;
  uriLogo:string,
  hometeam:string,
  uriAwayLogo:string,
  awayteam:string,
  jorney:string,
  resultHome?:string,
  resultaway?:string,
  timestamp:string,
  id:string,
  isLast?:boolean,
}
const Game = ({competation,hometeam,uriLogo,jorney,awayteam,uriAwayLogo,timestamp,isLast,resultHome,resultaway,id}:IGame) => {
  const navigation = useNavigation()
  
  function formatDate() {
    const date = new Date(Number(timestamp.seconds) * 1000);
    const dayOfWeek = date.getDay();
    const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dayOfMonth = date.getDate();
    const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${dayOfMonth} ${monthName} ${isLast ? formatHour() : ""}` ;
    return formattedDate;
  }

  function formatHour() {
    const date = new Date(Number(timestamp.seconds) * 1000);
   
    const formattedDate = `${date.getHours()}:${date.getMinutes().toString().length === 1 ? `${date.getMinutes()}0` : date.getMinutes() }`;
    return formattedDate === '0:00' || formattedDate === '1:00' ? 'N/D' : formattedDate;
  }

return <TouchableOpacity
        onPress={()=>{
          navigation.navigate("GameDetail",{
            id:id
          })
        }}
        activeOpacity={0.7}>
   <View className='w-full pb-3   pl-4  mt-6  border-b border-white_20 h-auto pr-4'>
    <View className='w-full h-8 flex-row mb-2 items-center justify-between'>
        <View style={{backgroundColor:'#00835B'}} className='   justify-center  items-center rounded-full top-[-3] h-4 w-9'>
                <Text className={`font-dinBold top-[-1]  text-xs  text-white ${Platform.OS === 'ios' && ' h-full mt-[10]'}`}>J{!jorney ? "1" : jorney.trim()}</Text>
      </View>
      <View className="w-full items-center mb-2">
        <Text className={`font-Poppins   ${ isLast ? 'ml-[-86]' : 'ml-[-90]' }  text-sm h-6 text-white `}>
                  {formatDate()}
        </Text>
      </View>
      <View className='absolute right-3'>
        <Image source={require('../../assets/icons/arrowrigth.png')}></Image>
      </View>
    </View>
   
    <View className='w-full flex-row  mb-2 justify-between '>
        <View className='flex justify-left items-center w-2/5 flex-row gap-1'>
            <Text className='font-Poppins 
                w-20
                text-center h-15 flex-wrap text-xs pt-1 mt-2 mb-2 text-white'>
              {hometeam}
            </Text>
            <Image className='w-10  h-10 ' source={{uri:uriLogo}}  />
        </View>
        <View className='flex flex-col items-center gap-2 justify-left mr-8'>
          <View className=' justify-center mb-[-8] w-1/5 items-center'>
            {isLast ?
              <View className='w-16 flex-row   justify-between items-center'>
                  <View className='bg-white w-7 mr-2 h-9 rounded-md justify-center items-center'>
                    <Text className={`font-dinCondensed  text-header  text-bgauth ${Platform.OS === 'ios' && 'leading-9  pt-2'}`}>
                      {resultHome}
                    </Text>
                  </View>
                  <View className='bg-white w-7 h-9 rounded-md justify-center items-center'>
                  <Text className={`font-dinCondensed  text-header  text-bgauth ${Platform.OS === 'ios' && 'leading-9  pt-2'}`}>
                      {resultaway}
                    </Text>
                  </View>
              </View>
            :
            <View className='w-12 flex-row  justify-between'>
            <Text className='font-dinCondensed  text-2xl  text-white text-center'>
              {formatHour()}
            </Text>
            </View>
            }
          </View>
        </View>
        <View className='flex justify-center items-center w-2/5 flex-row gap-2'>
           <Image className='w-10  h-10 ' resizeMode='contain' source={{uri:uriAwayLogo}}  />
               <Text className='font-Poppins 
                w-20
                text-center h-15 flex-wrap text-xs pt-1 mt-2 mb-2 text-white'>
              {awayteam}
            </Text>
        </View>
    </View>
</View> 
</TouchableOpacity> 
}

export default Game;