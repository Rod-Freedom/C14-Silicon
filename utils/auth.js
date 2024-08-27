export function loggedInMW (req, res, next) {
    const { session: { logged_in, user_id, username }, originalUrl } = req;

    if (!logged_in && !originalUrl.includes('/api') && (originalUrl !== '/login')) return res.redirect('/login')
    
    res.locals.user_id = user_id;
    res.locals.username = username;
    next();
};