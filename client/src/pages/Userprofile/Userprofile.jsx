import React, { useState } from 'react'
import Leftsidebar from '../../components/Lesftsidebar/Leftsidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake, faPen} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Editprofileform from './Editprofileform'
import Profilebio from './Profilebio'
import './Userprofile.css'

const Userprofile = () => {
    const { id }= useParams()
    const users= useSelector((state)=> state.usersreducer)
    const currentprofile = users.filter((user)=> user._id === id)[0]
    const currentuser= useSelector((state)=>state.currentuserreducer)
    const  [Switch, setSwitch]= useState(false)
  return (
    <div className='home-container-1'>
      <Leftsidebar/>
      <div className='home-container-2'>
        <section>
            <div className='user-details-container'>
                <div className='user-details'>
                    <Avatar backgroundColor="purple" color='black' fontSize='50px' px='40px' py='30px'>
                    {currentprofile?.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className='user-name'>
                        <h1>{currentprofile?.name}</h1>
                        <p><FontAwesomeIcon icon ={faBirthdayCake}/> Joined {moment(currentprofile?.joinedon).fromNow()}</p>
                    </div>
                </div>
                {
                    currentuser?.result._id === id &&(
                        <button type='button' onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                                <FontAwesomeIcon icon={faPen}/>  Edit profile
                        </button>
                    ) 
                }
            </div>
            <>
                {
                    Switch? (
                        <Editprofileform currentuser={currentuser} setSwitch={setSwitch} />
                    ):(
                        <Profilebio currentprofile={currentprofile}/>
                    )
                }
            </>
        </section>
      </div>
    </div>
  )
}

export default Userprofile
