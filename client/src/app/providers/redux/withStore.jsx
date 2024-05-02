import {Provider} from "react-redux";
import {setupStore} from "../../store";

const store = setupStore()

export const withStore = (Component) => (props) => {

    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}
