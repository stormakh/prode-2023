import { Fragment, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaSpinner } from 'react-icons/fa'
import {RiUserForbidLine} from 'react-icons/ri'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}






export default function NavbarProdeUsers() {
   
    const {firebaseUser, logout, AnonUsername} = useAuth();
    
    const userPopup = useMemo(() => {
      
      if(firebaseUser){
        if(firebaseUser.isAnonymous){
            return <PopUpAnon/>
        }else{
            return <PopUpUser/>
        }
    }}, [firebaseUser])


    function userDisplayName(){ //me devuelve las iniciales o un icono de anonimo
        if(firebaseUser){
            if(firebaseUser.isAnonymous){
                return <RiUserForbidLine size={'18px'} />
            }
            //only grab the initials
            if(firebaseUser.displayName ){
              return firebaseUser.displayName.split(' ').map((n : any)=>n[0]).join('')
            }
            if(firebaseUser.email){
              return firebaseUser.email.split('@')[0][0] + firebaseUser.email.split('@')[0][1]
            }
        }
        return <FaSpinner className='spin' size={'18px'} />
      }
        
    

    function PopUpAnon(){
        return(
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-0">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      
                      className='bg-juan text-white block px-4 py-1 text-xl first-letter:text-2xl font-bold text-right rounded-md rounded-b-none'
                    >
                        {AnonUsername? AnonUsername : 'Anonimo'}
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      
                      className={classNames(
                         'text-black text-right',
                        'block px-4 py-2 text-sm line-clamp-2'
                      )}
                    >
                      
                      {AnonUsername ? 'Logged in as ' : 'You are NOT logged in'}{AnonUsername? <b>{AnonUsername}</b> : ''}
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={'/SignWall'}
                      className={classNames(
                        active ? 'bg-gray-100 text-teal-500' : 'text-black',
                        'block px-4 py-2 text-md text-right font-bold'
                      )}
                    >
                      Registrate con Google
                    </Link>
                  )}
                </Menu.Item>
                
              </div>
            </Menu.Items>
        )
    
    }

    function PopUpUser(){
        return(
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-0">
            <Menu.Item>
              {({ active }) => (
                <div
                  
                  className='bg-juan text-white block px-4 py-1 text-xl first-letter:text-2xl font-bold text-right rounded-md rounded-b-none'
                >
                    {userDisplayName()}
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  
                  className={classNames(
                     'text-black text-right',
                    'block px-4 py-2 text-sm line-clamp-2 border-b'
                  )}
                >
                  Signed in as <br></br><b>{firebaseUser.email}</b>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/home'}
                  className={classNames(
                    active ? 'bg-gray-100 text-teal-500' : 'text-black',
                    'block px-4 py-2 text-md text-right font-bold'
                  )}
                  onClick={logout}
                >
                  Logout
                </Link>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
        )
    
    }


  return (


    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-10 h-10 items-center justify-center gap-x-1.5 rounded-full bg-juan px-1 py-1 text-sm font-semibold text-white">
         { userDisplayName()}
          
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
            <div>
                {userPopup}
            </div>
        
      </Transition>
    </Menu>

           


  )
}
