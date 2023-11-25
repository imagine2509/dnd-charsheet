type WithAuthProps = {
    isAuthorized: boolean
    components: {
        ComponentForAuthorized: React.ComponentType<any>
        ComponentForUnauthorized: React.ComponentType<any>
    }
}

const withAuth = ({ isAuthorized, components: { ComponentForAuthorized, ComponentForUnauthorized } }: WithAuthProps) => {
    const ComponentAuthWrapper: React.FC<any> = (props) => {
        if (isAuthorized) {
            return <ComponentForAuthorized {...props} />
        }
        else {
            return <ComponentForUnauthorized {...props} />
        }
    }
    return ComponentAuthWrapper
}

export default withAuth
