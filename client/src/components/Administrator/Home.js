import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaUserPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineAddPhotoAlternate, MdEventNote, MdOutlineCategory } from 'react-icons/md';

const Home = () => {
    const navigate = useNavigate()
    const [s, setS] = useState(false)
    const [wid, setWid] = useState('')

    const getWidth = () => {
        const w = window.innerWidth;
        setWid(w)
    }
    
    const odjava = () => {
        localStorage.clear('isAuth')
        navigate('/logout')
    }

    
    useEffect(()=> {
        window.addEventListener('fullscreenchange', getWidth())
        window.addEventListener('resize',  ()=> {getWidth();  if (wid < 900) {
            setS(true)
        }
       else setS(false)});

        console.log(wid)
        console.log(s)
        
        
    }, [wid])

    return (
        <ProSidebar   className={`${s ? 'collapsed' : ''}`}>
            <SidebarHeader className='text-center'>
                <img src={logo} style={{ width: '100px' }} onClick={() => navigate('/')} className="logo" />
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem icon={<MdEventNote />} >Prikaz termina <Link to='/showDates' /></MenuItem>
                    <MenuItem icon={<FaUserPlus />} >Dodaj administratora <Link to='/addAdmin' /></MenuItem>
                    <MenuItem icon={<MdOutlineCategory />} >Uredi događaje <Link to='/editEvents' /></MenuItem>
                    <MenuItem icon={<MdOutlineAddPhotoAlternate />} >Dodaj nove slike <Link to='/addPhoto' /></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter >
                <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut />} onClick={odjava} >Odjavi se</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    )
};

export default Home;
