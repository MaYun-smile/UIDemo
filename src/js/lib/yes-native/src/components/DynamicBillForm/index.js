import { DynamicBillFormWrap } from 'yes';
import { ErrorMessageBox } from '../MessageBox';
import LoadingComp from '../LoadingComp';

const DynamicBillForm = DynamicBillFormWrap(ErrorMessageBox, LoadingComp);
export default DynamicBillForm;
