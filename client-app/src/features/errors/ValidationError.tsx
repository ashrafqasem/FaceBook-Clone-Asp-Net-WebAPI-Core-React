import { Message } from "semantic-ui-react";

interface Props {
    //errors: string[] | null;
    errors: any; //' n
}

export default function ValidationError({errors}: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {/* {errors.map((err: string, idx) => ( */}
                    {errors.map((err: string, idx: any) => ( //' n
                        <Message.Item key={idx}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}