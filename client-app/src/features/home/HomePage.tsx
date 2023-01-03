import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

//export default function HomePage() {
export default observer(function HomePage() { //' n
    const {userStore, modalStore} = useStore(); //' n

    return (
        // <Container style={{marginTop: '7em'}}>
        //     <h1>Home page</h1>
        //     <h3>Go to <Link to='/Activities'>Activities</Link></h3>
        // </Container>

        <Segment inverted textAlign='center' vertical className='masthead'  >
            <Container text >
                <Header as='h1' inverted >
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Facebook
                </Header>
                {/* <Header as='h2' inverted content='Welcome to Facebook' /> */}
                {/* <Button as={Link} to='/activities' size='huge' inverted >
                    Go to Activities!
                </Button> */}
                {/* <Button content='Login!' inverted as={Link} to='/login' /> */}

                {userStore.isLoggedIn ? ( //' n
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Facebook' />
                        <Button content='Go to Activities!' as={Link} to='/activities' size='huge' inverted />
                    </Fragment>
                ) : ( 
                    // <Button content='Login!' size='huge' inverted as={Link} to='/login' />

                    <Fragment>
                        {/* <Button content='Login!' size='huge' inverted as={Link} to='/login' /> */}
                        <Button content='Login!' size='huge' inverted onClick={() => modalStore.openModal(<LoginForm />) } />

                        {/* <Button content='Register!' size='huge' inverted onClick={() => modalStore.openModal(<h1>Register</h1>) } /> */}
                        <Button content='Register!' size='huge' inverted onClick={() => modalStore.openModal(<RegisterForm />) } />
                    </Fragment>
                )}

            </Container>
        </Segment>
    )
})