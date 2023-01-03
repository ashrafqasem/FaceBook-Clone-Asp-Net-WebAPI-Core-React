import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

// interface Props {
//     openForm: () => void;
// }

//export default function NavBar({openForm} : Props) {
//export default function NavBar() {
export default observer(function NavBar() {

    const {activityStore, userStore: {user, logout, isLoggedIn}} = useStore(); //' n

    return (
        <Menu inverted fixed='top'>
            <Container>
                {/* <Menu.Item header> */}
                <Menu.Item header as={NavLink} to='/' >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Facebook
                </Menu.Item>
                {/* <Menu.Item name='Activities' /> */}
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item name='Errors' as={NavLink} to='/errors' />
                <Menu.Item>
                    {/* <Button positive content='Create Activity' onClick={openForm} /> */}
                    {/* <Button positive content='Create Activity' onClick={() => activityStore.formOpen()} /> */}
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
                </Menu.Item>
                    
                {isLoggedIn ? (
                    <Menu.Item position='right' >
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.displayName} >
                            <Dropdown.Menu>
                                <Dropdown.Item text='My Profile' icon='user' as={Link} to={`/profile/${user?.userName}`} />
                                <Dropdown.Item text='Logout' icon='power' onClick={logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                ) : (
                    <Menu.Item position='right' >
                        <Image src={'/assets/user.png'} avatar spaced='right' />
                        <Menu.Item>
                            <Button positive content='Login' as={NavLink} to='/login' />
                        </Menu.Item>
                    </Menu.Item>
                )}


            </Container>
        </Menu>

    )
})