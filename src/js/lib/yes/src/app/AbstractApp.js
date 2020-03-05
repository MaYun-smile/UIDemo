import yesmobile, {Util} from "../yes_ext";
import EventEmitter from "eventemitter3";
import { inejectServer } from 'yes-core';
import AppDispatcher from "../dispatchers/AppDispatcher";
import {DummyDocument as GlobalObject} from "yes-common";
import { getSession, setSession, setUserInfo} from "../session";
import { injectServer } from 'yes-core';
class App extends EventEmitter {
    constructor(props) {
        super(props);
        Object.assign(this, props);
    }

    openSplash() {

    }

    closeSplash() {

    }

    startErrorListener() {
        AppDispatcher.register((action) => {
            switch (action.type) {
                case 'ERROR':
                    Util.alert('错误', action.error.error_info || action.error.message || action.error);
                    break;
            }
        });
    }

    beforeStart() {

    }

    /**
     * 开始整个应用流程，启动用户指定路由
     * @param  { html node } el 当前app在界面上的渲染位置
     * @return
     */
    async start() {
        // if (el) {
        // 	this.rootEl = el;
        // }
        // if (!this.routes) {
        // 	this.emit('application routes lost!');
        // 	return;
        // }
        // if (!this.rootEl) {
        // 	this.rootEl = document.body;
        // }
        // if (navigator.userAgent.match(/iPhone/i)) {
        // 	$('body').addClass('ios');
        // }
        this.emit('beforestart', arguments);
        this.beforeStart(...arguments);
        injectServer(this.serverPath);
        // 初始化session
        // const clientID = getSession();
        // if (clientID) {
        //     GlobalObject.clientID = clientID;
        // } else {
        //     GlobalObject.clientID = '';
        // }
        // if (this.supportWechat && isWeixin()) {
        // 	Wechat.init(this.wechatOptions.appId, this.wechatOptions.proxyServer);
        // }
        this.startErrorListener();

        // History.listen((location) => {
        // 	switch (location.action) {
        // 		case 'PUSH':
        // 			AppStatus.setTransitionType(location.action);
        // 			break;
        // 		case 'POP':
        // 			AppStatus.setTransitionType(location.action);
        // 			break;
        // 	}
        // });
        // const AuthRouter = AuthenticatedRoute(Router, this.Login, 'root');
        // render(<MuiThemeProvider muiTheme={getMuiTheme()}>
        // 			<AuthRouter history={History}>{this.routes}</AuthRouter>
        // 		</MuiThemeProvider>,
        // 	this.rootEl);
        this.renderRootComponent();
    }

    renderRootComponent() {

    }
}
export default App;
