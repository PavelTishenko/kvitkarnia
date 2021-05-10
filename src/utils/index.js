export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRole))return false;
    const {userRole} = currentUser;
    if (userRole.includes('admin')) return true;
    return false
}