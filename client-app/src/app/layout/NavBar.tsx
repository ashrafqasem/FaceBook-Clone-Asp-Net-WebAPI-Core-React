import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

// interface Props {
//     openForm: () => void;
// }

//export default function NavBar({openForm} : Props) {
export default function NavBar() {

    const {activityStore} = useStore(); //' nw

    return (
        <Menu inverted fixed='top'>
            <Container>
                {/* <Menu.Item header> */}
                <Menu.Item header as={NavLink} to='/' >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    {/* Reactivities */}
                    Facebook-clone
                </Menu.Item>
                {/* <Menu.Item name='Activities' /> */}
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item name='Errors' as={NavLink} to='/errors' />
                <Menu.Item>
                    {/* <Button positive content='Create Activity' onClick={openForm} /> */}
                    {/* <Button positive content='Create Activity' onClick={() => activityStore.formOpen()} /> */}
                    <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
                </Menu.Item>
                
            </Container>
        </Menu>

    )
}