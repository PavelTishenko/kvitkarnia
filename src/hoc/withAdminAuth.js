import {useAdminAuth} from './../customHook';

const WithAdminAuth = props => useAdminAuth(props) && props.children;
export default WithAdminAuth;