export default (matchedRoutes) => {
    return matchedRoutes.reduce((previous, current) => current.status || previous, null);
};
