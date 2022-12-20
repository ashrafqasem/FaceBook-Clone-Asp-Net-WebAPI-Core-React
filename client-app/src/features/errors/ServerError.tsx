
import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


export default observer( function ServerError() {
    const {commonStore} = useStore();

    return (
        <Container>
            <Header as='h1' content='Server error' />
            {/* <Header sub as='h5' content={commonStore.serverError?.message} color='red' /> */}
            {/* <Header sub as='h5' content={commonStore.serverError} color='red' /> */}

            {/* {commonStore.serverError?.details && (
                <Segment>
                    <Header as='h4' content='Stack trace' color='teal' />
                    <code style={{marginTop: '10px'}}>{commonStore.serverError.details}</code>
                </Segment>
            )} */}

            {commonStore.serverError && (
                <Segment>
                    <Header as='h4' content='Stack trace' color='teal' />
                    <code style={{marginTop: '10px'}}>{commonStore.serverError}</code>
                </Segment>
            )}

        </Container>
    )
})