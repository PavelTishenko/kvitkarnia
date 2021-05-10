import { useAuth } from '../customHook';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;