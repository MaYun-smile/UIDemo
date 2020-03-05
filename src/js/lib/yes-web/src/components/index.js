import Text from './Text';
import Icon from './Icon';
import List from './List';
import Label from './Label';
import Chart from './Chart';
import Login from './Login';
import Image from './Image';
import Switch from './Switch';
import Slider from './Slider';
import Button from './Button';
import Layout from './Layout';
import DatePicker from './Date';
import Gallery from './Gallery';
import PopView from './PopView';
import Rotator from './Rotator';
import Flex from './Layout/Flex';
import GIFImage from './GIFImage';
import CheckBox from './Checkbox';
import FormInfo from './FormInfo';
import ScoreBar from './ScoreBar';
import TabGroup from './TabGroup';
import Calendar from './Calendar';
import TextArea from './TextArea';
import BillForm from './BillForm';
import ComboBox from './Combobox';
import PopButton from './PopButton';
import HyperLink from './HyperLink';
import TableView from './TableView';
import ImageList from './ImageList';
import TiledList from './TiledList';
import WaterFall from './WaterFall';
import ChainDict from './ChainDict';
import ShrinkView from './ShrinkView';
import StepEditor from './StepEditor';
import WebBrowser from './WebBrowser';
import LoadingComp from './LoadingComp';
import BusyLoading from './BusyLoading';
import ImageButton from './ImageButton';
import RotatorList from './RotatorList';
import RadioButton from './RadioButton';
import ProgressBar from './ProgressBar';
import ValidateBox from './ValidateBox';
import TabContainer from './TabContainer';
import { View, ScrollView } from './View';
import CountDownView from './CountDownView';
import NavigationBar from './NavigationBar';
import FlexLayout from './Layout/FlexLayout';
import TabView, { TabPanel } from './TabView';
import FullScreenView from './FullScreenView';
import RefreshControl from './RefreshControl';
import DynamicBillForm from './DynamicBillForm';
import SegmentedControl from './SegmentedControl';
import NumberTextEditor from './NumberTextEditor';
import NumberInfoEditor from './NumberInfoEditor';
import ProgressIndicator from './ProgressIndicator';
import SplitPanel from './LayoutControl/SplitPanel';
import AnimatedLayout from './Layout/AnimatedLayout';
import AuthenticatedRoute from './AuthenticatedRoute';
import PasswordTextEditor from './PasswordTextEditor';
import FitParentLayout from './Layout/FitParentLayout';
import GridLayoutPanel from './LayoutControl/GridLayoutPanel';
import FlowLayoutPanel from './LayoutControl/FlowLayoutPanel';
import ColumnLayoutPanel from './LayoutControl/ColumnLayoutPanel';
import BorderLayoutPanel from './LayoutControl/BorderLayoutPanel';
import LinearLayoutPanel from './LayoutControl/LinearLayoutPanel';
import SlidingLayoutPanel from './LayoutControl/SlidingLayoutPanel';
import FlexflowLayoutPanel from './LayoutControl/FlexflowLayoutPanel';
import FluidTableLayoutPanel from './LayoutControl/FluidTableLayoutPanel';
import TriggerControlWrap from 'yes-native/dist/components/TriggerControlWrap';
import { defaultControlMapping, plainControlMapping } from '../controlMappings';
import { NavigatorToolbar, ToolbarAction, WorkflowToolbar, ToolModal } from './ToolBar';
import { GridView, CellLayoutRowDetail, DefaultGridRow, TextGrid, withDetail } from './Grid';
import { TextLinkList, ImmutableVirtualizedList, CellLayoutList, Timeline, DefaultRow } from './List';
import {
    ControlWrap, TextWrap, RefreshControlWrap, DictWrap, ComboboxWrap,
    PanelWrap, ListWrap, GridWrap, LoginWrap, OperationWrap
} from 'yes';
// import { withDetail, gridview, TextGrid, CellLayoutRowDetail } from './Grid';

export const result = {
    Flex,
    View,
    Layout,
    TabView,
    BillForm,
    FormInfo,
    FlexLayout,
    ScrollView,
    LoadingComp,
    BusyLoading,
    NavigationBar,
    FullScreenView,
    AnimatedLayout,
    DynamicBillForm,
    FitParentLayout,
    AuthenticatedRoute,
    CellLayoutRowDetail,
    Text: TextWrap(Text),
    List: ListWrap(List),
    Login: LoginWrap(Login),
    Icon: ControlWrap(Icon),
    Label: ControlWrap(Label),
    Image: ControlWrap(Image),
    Chart: ControlWrap(Chart),
    Rotator: ListWrap(Rotator),
    Gallery: ListWrap(Gallery),
    Switch: ControlWrap(Switch),
    Button: ControlWrap(Button),
    Slider: ControlWrap(Slider),
    TextArea: TextWrap(TextArea),
    Timeline: ListWrap(Timeline),
    TabPanel: PanelWrap(TabPanel),
    PopView: ControlWrap(PopView),
    TiledList: ListWrap(TiledList),
    ChainDict: DictWrap(ChainDict),
    WaterFall: ListWrap(WaterFall),
    Checkbox: ControlWrap(CheckBox),
    GIFImage: ControlWrap(GIFImage),
    ScoreBar: ControlWrap(ScoreBar),
    TableView: PanelWrap(TableView),
    Calendar: ControlWrap(Calendar),
    TabGroup: ControlWrap(TabGroup),
    MobileLogin: LoginWrap(Login, 2),
    ComboBox: ComboboxWrap(ComboBox),
    DefaultRow: ListWrap(DefaultRow),
    Radiobox: ComboboxWrap(ComboBox),
    ImageList: ControlWrap(ImageList),
    SplitPanel: PanelWrap(SplitPanel),
    PopButton: ControlWrap(PopButton),
    ToolModal: ControlWrap(ToolModal),
    RotatorList: ListWrap(RotatorList),
    HyperLink: ControlWrap(HyperLink),
    ValidateBox: TextWrap(ValidateBox),
    WebBrowser: ControlWrap(WebBrowser),
    StepEditor: ControlWrap(StepEditor),
    CheckListBox: ComboboxWrap(ComboBox),
    TextLinkList: ListWrap(TextLinkList),
    DatePicker: ComboboxWrap(DatePicker),
    ProgressBar: ControlWrap(ProgressBar),
    ImageButton: ControlWrap(ImageButton),
    RadioButton: ControlWrap(RadioButton),
    TabContainer: ControlWrap(TabContainer),
    DefaultGridRow: GridWrap(DefaultGridRow),
    CellLayoutList: ListWrap(CellLayoutList),
    CountDownView: ControlWrap(CountDownView),
    NavToolbar: ControlWrap(NavigatorToolbar),
    ToolbarAction: ControlWrap(ToolbarAction),
    ShrinkView: RefreshControlWrap(ShrinkView),
    FlowLayoutPanel: PanelWrap(FlowLayoutPanel),
    GridLayoutPanel: PanelWrap(GridLayoutPanel),
    NumberTextEditor: TextWrap(NumberTextEditor),
    NumberInfoEditor: TextWrap(NumberInfoEditor),
    OperationBar: OperationWrap(NavigatorToolbar),
    WorkflowToolbar: ControlWrap(WorkflowToolbar),
    BorderLayoutPanel: PanelWrap(BorderLayoutPanel),
    ColumnLayoutPanel: PanelWrap(ColumnLayoutPanel),
    LinearLayoutPanel: PanelWrap(LinearLayoutPanel),
    SegmentedControl: ComboboxWrap(SegmentedControl),
    SlidingLayoutPanel: PanelWrap(SlidingLayoutPanel),
    ProgressIndicator: ControlWrap(ProgressIndicator),
    RefreshControl: RefreshControlWrap(RefreshControl),
    FlexflowLayoutPanel: PanelWrap(FlexflowLayoutPanel),
    PasswordTextEditor: ControlWrap(PasswordTextEditor),
    WorkflowOperationBar: OperationWrap(WorkflowToolbar),
    FluidTableLayoutPanel: PanelWrap(FluidTableLayoutPanel),
    // withDetail,
    // ChainDict: DictWrap(TriggerControlWrap(ChainDict)),
    // ComboBox: ComboboxWrap(TriggerControlWrap(ComboBox)),
    // CheckListBox: ComboboxWrap(TriggerControlWrap(ComboBox)),
    // DatePicker: ComboboxWrap(TriggerControlWrap(DatePicker)),
};
defaultControlMapping.reg('icon', result.Icon);
plainControlMapping.reg('dict', DictWrap(Text));
defaultControlMapping.reg('label', result.Label);
defaultControlMapping.reg('chart', result.Chart);
plainControlMapping.reg('switch', result.Switch);
defaultControlMapping.reg('image', result.Image);
defaultControlMapping.reg('button', result.Button);
defaultControlMapping.reg('slider', result.Slider);
defaultControlMapping.reg('switch', result.Switch);
defaultControlMapping.reg('dict', result.ChainDict);
defaultControlMapping.reg('texteditor', result.Text);
defaultControlMapping.reg('toolbar', result.Toolbar);
defaultControlMapping.reg('popview', result.PopView);
defaultControlMapping.reg('gallery', result.Gallery);
defaultControlMapping.reg('rotator', result.Rotator);
defaultControlMapping.reg('gifimage', result.GIFImage);
defaultControlMapping.reg('textarea', result.TextArea);
defaultControlMapping.reg('checkbox', result.Checkbox);
defaultControlMapping.reg('scorebar', result.ScoreBar);
defaultControlMapping.reg('combobox', result.ComboBox);
defaultControlMapping.reg('tabpanel', result.TabPanel);
defaultControlMapping.reg('calendar', result.Calendar);
defaultControlMapping.reg('tabgroup', result.TabGroup);
defaultControlMapping.reg('toolbar', result.ToolModal);
plainControlMapping.reg('combobox', ComboboxWrap(Text));
defaultControlMapping.reg('dynamicdict', DictWrap(Text));
defaultControlMapping.reg('tableview', result.TableView);
defaultControlMapping.reg('hyperlink', result.HyperLink);
defaultControlMapping.reg('listview', result.DefaultRow);
defaultControlMapping.reg('grid', result.DefaultGridRow);
defaultControlMapping.reg('imagelist', result.ImageList);
defaultControlMapping.reg('popbutton', result.PopButton);
defaultControlMapping.reg('tiledlist', result.TiledList);
defaultControlMapping.reg('waterfall', result.WaterFall);
defaultControlMapping.reg('stepeditor', result.StepEditor);
defaultControlMapping.reg('shrinkview', result.ShrinkView);
// defaultControlMapping.reg('listview', result.TextLinkList);
defaultControlMapping.reg('webbrowser', result.WebBrowser);
defaultControlMapping.reg('datepicker', result.DatePicker);
plainControlMapping.reg('radiobutton', result.RadioButton);
defaultControlMapping.reg('splitpanel', result.SplitPanel);
defaultControlMapping.reg('rotatorlist', result.RotatorList);
defaultControlMapping.reg('validatebox', result.ValidateBox);
defaultControlMapping.reg('progressbar', result.ProgressBar);
defaultControlMapping.reg('imagebutton', result.ImageButton);
defaultControlMapping.reg('radiobutton', result.RadioButton);
defaultControlMapping.reg('tabcontainer', result.TabContainer);
defaultControlMapping.reg('checklistbox', result.CheckListBox);
defaultControlMapping.reg('refreshcontrol', result.RefreshControl);
defaultControlMapping.reg('flowlayoutpanel', result.FlowLayoutPanel);
defaultControlMapping.reg('gridlayoutpanel', result.GridLayoutPanel);
defaultControlMapping.reg('segmentedcontrol', result.SegmentedControl);
defaultControlMapping.reg('passwordeditor', result.PasswordTextEditor);
defaultControlMapping.reg('columnlayoutpanel', result.ColumnLayoutPanel);
defaultControlMapping.reg('borderlayoutpanel', result.BorderLayoutPanel);
defaultControlMapping.reg('progressindicator', result.ProgressIndicator);
defaultControlMapping.reg('linearlayoutpanel', result.LinearLayoutPanel);
defaultControlMapping.reg('slidinglayoutpanel', result.SlidingLayoutPanel);
defaultControlMapping.reg('numbereditor', TextWrap(result.NumberTextEditor));
defaultControlMapping.reg('flexflowlayoutpanel', result.FlexflowLayoutPanel);
defaultControlMapping.reg('countdownview', ControlWrap(result.CountDownView));
defaultControlMapping.reg('fluidtablelayoutpanel', result.FluidTableLayoutPanel);
defaultControlMapping.reg('numberinfoeditor', TextWrap(result.NumberInfoEditor));
// defaultControlMapping.reg('grid', result.TextGrid);
// plainControlMapping.reg('radiobutton', result.ComboBox);
// defaultControlMapping.reg('radiobutton', result.ComboBox);
export default result;
