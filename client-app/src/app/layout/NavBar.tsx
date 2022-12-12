import React from 'react';
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
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    {/* <Button positive content='Create Activity' onClick={openForm} /> */}
                    <Button positive content='Create Activity' onClick={() => activityStore.formOpen()} />
                </Menu.Item>
            </Container>
        </Menu>

    )
}