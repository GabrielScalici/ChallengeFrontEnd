import React, { Component } from 'react';

//COMPONENTES
import HistoryList from '../HistoryList';

//REDUX
import { connect } from 'react-redux';
import {
    modificaConsult, modificaDispConsult, modificaNumConsult
} from '../../redux/actions/ConsultActions';

//FIREBASE
import { db } from '../../utils/firebase';

export class HistoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            keys: [],
        }
    }

    componentDidMount() {
        db.ref('COMPRA').on('value', snapshot => {
            let data = snapshot.val();
            let item = Object.values(data);
            var key = Object.keys(data);
            this.setState({ items: item });
            this.setState({ keys: key });
        })
    }
    render() {
        return (
            <div>
                <div className="Title-History">
                    <h2 className="ui icon header">
                        <i className="clone icon"></i>
                        <div className="content">
                            Histórico
                        <div className="sub header">Relatório completo das compras efetuadas no site</div>
                        </div>
                    </h2>
                </div>
                <HistoryList
                    className="List-Buy"
                    items={this.state.items}
                />
            </div>
        );
    }
}

//USANDO REDUX
const mapStateToProps = state => (
    {
        consult: state.ConsultReducer.consult,
        num_consults: state.ConsultReducer.num_consults,
        disp_consults: state.ConsultReducer.disp_consults,

    }
)
export default connect(mapStateToProps, {
    modificaConsult, modificaDispConsult, modificaNumConsult
})(HistoryContainer);
