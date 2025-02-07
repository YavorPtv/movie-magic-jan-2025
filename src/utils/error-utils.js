export const getErrorMessage = (err) => {
    switch (err.name) {
        case 'Validation error':
            return Object.values(err.errors).at(0).message;
        default:
            return err.message;
    }
}