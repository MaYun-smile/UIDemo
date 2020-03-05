import { ControlWrap, RefreshControlWrap, DictWrap, ComboboxWrap, PanelWrap, ListWrap, GridWrap, LoginWrap, OperationWrap } from 'yes';
import TriggerControlWrap from './TriggerControlWrap';
import Button from './Button';
import HyperLink from './HyperLink';
import Label from './Label';
import CheckBox from './Checkbox'
import RadioButton from './RadioButton';
import DatePicker from './DatePicker';
import FullScreenView from './FullScreenView';
import { withDetail, TextGrid, CellLayoutRowDetail } from './Grid';
import Login from './Login';
import LoadingComp from './LoadingComp';
import BusyLoading from './BusyLoading';
import NumberTextEditor from './NumberTextEditor';
import Text from './Text';
import PasswordTextEditor from './PasswordTextEditor';
import TextArea from './TextArea';
import Switch from './Switch';
import Image from './Image';
import ComboBox from './Combobox';
import { TextLinkList, ImmutableVirtualizedList, CellLayoutList, Timeline,DefaultRow } from './List';
import ChainDict from './ChainDict';
// import FlexLayout from './Layout/FlexLayout';
// import Flex from './Layout/Flex';
import BillForm from './BillForm';
import DynamicBillForm from './DynamicBillForm';
import AuthenticatedRoute from './AuthenticatedRoute';
// import AnimatedLayout from './Layout/AnimatedLayout';
// import FitParentLayout from './Layout/FitParentLayout';
import Layout from './Layout';
import { NavigatorToolbar, ToolbarAction, WorkflowToolbar } from './Toolbar';
import { defaultControlMapping, plainControlMapping } from '../controlMappings';
import { View, ScrollView } from './View';
import TabView, { TabPanel } from './TabView';
import GridLayoutPanel from './GridLayoutPanel';
import LinearLayoutPanel from './LinearLayoutPanel';
import FlexflowLayoutPanel from './FlexflowLayoutPanel';
import FlowLayoutPanel from './FlowLayoutPanel';
import TableView from './TableView';
import RefreshControl from './RefreshControl';
import ShrinkView from './ShrinkView';
import FormInfo from './FormInfo';
import NavigationBar from './NavigationBar';
import StepEditor from './StepEditor';

export const result = {
    Button: ControlWrap(Button),
    HyperLink: ControlWrap(HyperLink),
    Label: ControlWrap(Label),
    TextLinkList: ListWrap(TextLinkList),
    DefaultRow: ListWrap(DefaultRow),
    CellLayoutList: ListWrap(CellLayoutList),
    Timeline: ListWrap(Timeline),
    NavToolbar: ControlWrap(NavigatorToolbar),
    OperationBar: OperationWrap(NavigatorToolbar),
    WorkflowToolbar: ControlWrap(WorkflowToolbar),
    WorkflowOperationBar: OperationWrap(WorkflowToolbar),
    ToolbarAction,
    ComboBox: ComboboxWrap(TriggerControlWrap(ComboBox)),
    Checkbox: ControlWrap(CheckBox),
    RadioButton: ControlWrap(RadioButton),
    DatePicker: ControlWrap(TriggerControlWrap(DatePicker)),
    FullScreenView,
    Login: LoginWrap(Login),
    MobileLogin: LoginWrap(Login, 2),
    NumberTextEditor: ControlWrap(NumberTextEditor),
    Text: ControlWrap(Text),
    PasswordTextEditor: ControlWrap(PasswordTextEditor),
    TextArea: ControlWrap(TextArea),
    Image: ControlWrap(Image),
    ComboBox: ComboboxWrap(TriggerControlWrap(ComboBox)),
    ChecklistBox : ComboboxWrap(TriggerControlWrap(ComboBox)),
    ChainDict: DictWrap(TriggerControlWrap(ChainDict)),
    // FlexLayout,
    BillForm,
    DynamicBillForm,
    AuthenticatedRoute,
    // AnimatedLayout,
    // Flex,
    // FitParentLayout,
    View,
    ScrollView,
    Layout,
    NavToolbar: ControlWrap(NavigatorToolbar),
    OperationBar: OperationWrap(NavigatorToolbar),
    WorkflowToolbar: ControlWrap(WorkflowToolbar),
    WorkflowOperationBar: OperationWrap(WorkflowToolbar),
    ToolbarAction: ControlWrap(ToolbarAction),
    CellLayoutList: ListWrap(CellLayoutList),
    TextGrid: GridWrap(withDetail(TextGrid)),
    Switch: ControlWrap(Switch),
    StepEditor: ControlWrap(StepEditor),
    withDetail,
    Radiobox: ComboboxWrap(ComboBox),
    TabView,
    TabPanel: PanelWrap(TabPanel),
    GridLayoutPanel: PanelWrap(GridLayoutPanel),
    LinearLayoutPanel: PanelWrap(LinearLayoutPanel),
    FlexflowLayoutPanel: PanelWrap(FlexflowLayoutPanel),
    FlowLayoutPanel: PanelWrap(FlowLayoutPanel),
    TableView: PanelWrap(TableView),
    RefreshControl: RefreshControlWrap(RefreshControl),
    ShrinkView: RefreshControlWrap(ShrinkView),
    FormInfo,
    NavigationBar,
    LoadingComp,
    BusyLoading,
    CellLayoutRowDetail,
};
defaultControlMapping.reg('button', result.Button);
defaultControlMapping.reg('label', result.Label);
defaultControlMapping.reg('texteditor', result.Text);
defaultControlMapping.reg('passwordeditor', result.PasswordTextEditor);
defaultControlMapping.reg('numbereditor', ControlWrap(result.NumberTextEditor));
defaultControlMapping.reg('textarea', ControlWrap(Text));
defaultControlMapping.reg('combobox', result.ComboBox);
defaultControlMapping.reg('checklistbox', result.ChecklistBox);
// defaultControlMapping.reg('radiobutton', result.RadioButton);
defaultControlMapping.reg('radiobutton', result.ComboBox);
defaultControlMapping.reg('switch', result.Switch);
defaultControlMapping.reg('stepeditor', result.StepEditor);
plainControlMapping.reg('combobox', ComboboxWrap(Text));
// plainControlMapping.reg('radiobutton', result.RadioButton);
plainControlMapping.reg('radiobutton', result.ComboBox);
plainControlMapping.reg('switch', result.Switch);
defaultControlMapping.reg('dict', result.ChainDict);
plainControlMapping.reg('dict', DictWrap(Text));
defaultControlMapping.reg('dynamicdict', DictWrap(Text));
defaultControlMapping.reg('tableview', result.TableView);
defaultControlMapping.reg('image', result.Image);
defaultControlMapping.reg('toolbar', result.Toolbar);
defaultControlMapping.reg('datepicker', result.DatePicker);
defaultControlMapping.reg('hyperlink', result.HyperLink);
defaultControlMapping.reg('gridlayoutpanel', result.GridLayoutPanel);
defaultControlMapping.reg('linearlayoutpanel', result.LinearLayoutPanel);
defaultControlMapping.reg('flexflowlayoutpanel', result.FlexflowLayoutPanel);
defaultControlMapping.reg('flowlayoutpanel', result.FlowLayoutPanel);
defaultControlMapping.reg('refreshcontrol', result.RefreshControl);
// defaultControlMapping.reg('shrinkview', result.ShrinkView);
defaultControlMapping.reg('tabpanel', result.TabPanel);
defaultControlMapping.reg('checkbox', result.Checkbox);
defaultControlMapping.reg('listview', result.TextLinkList);
defaultControlMapping.reg('listview', result.DefaultRow);
export default result;
