import { setData } from '../redux/documentsReducer.tsx';
import DataTable from './DataTable.tsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  documents: state.documents,
});

export const DataTableContainer = connect(mapStateToProps, {setData})(DataTable)