import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PageTitle from "./PageTitle";
import Metrics from "./Metrics";
import Table from "./Table";
import { VIPInstructions } from "components/ContentInstructions";
import "./VIP.scss";
import { GetVIP } from "services/api/server/platform";
import { benefits_values, points_and_rank, progress_values } from "./temp_data";
import { translate } from "helpers/translate";

type Props = {
  name: string;
  id: string;
};

type State = {
  rankData: { [key: string]: any };
  isLoading: Boolean;
  error: any;
};
class VIP extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      rankData: {},
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.getVip(this.props.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getVip(this.props.id);
    }
  }

  getVip(id: string) {
    this.setState({ isLoading: true }, async () => {
      try {
        const res = await GetVIP();
        this.setState({
          rankData: { ...res.data },
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          error,
        });
      }
    });
  }

  render() {
    const benefits_head = [translate("vip.benefits_head.vip_benefits"), translate("vip.benefits_head.bronze"), translate("vip.benefits_head.silver"), translate("vip.benefits_head.gold")];
    const points_rank_head = [translate("vip.points_and_rank_head")];
    const { name } = this.props;
    const { rank, next_rank, payout, points } = this.state.rankData;

    return (
      <div id="vip-container" className="py-5">
        <PageTitle />
        <div id="vip-content">
          <Metrics
            userName={name}
            rankData={{ rank, next_rank, payout, points }}
            progressData={progress_values}
          />
          <div id="vip-table">
            <div className="column-bg-divider">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id="benefits-wrapper">
              <Table thRowData={benefits_head} tbRowData={benefits_values} />
            </div>
            <div id="points-wrapper">
              <Table thRowData={points_rank_head} tbRowData={points_and_rank} />
            </div>
          </div>
          <div className="col-md-12 col-xl-10 px-0 mt-3">
            <VIPInstructions />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ platform }) => {
  const { account } = platform;

  return {
    name: account?.username,
    id: account?.id,
  };
};
export default connect(mapStateToProps)(VIP);
