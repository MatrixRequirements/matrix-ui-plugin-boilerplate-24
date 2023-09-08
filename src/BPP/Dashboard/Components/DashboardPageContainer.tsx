import * as React from "react";
import { DashboardProps, IProjectSettings } from "../../Interfaces";
import { PageTitle } from "./PageTitle";
import { Dashboard } from "../DashboardPage";

export class DashboardPageContainer extends React.Component<DashboardProps> {
    settings: IProjectSettings;

    render() {
        return (
            <div>
                <div id="itemDetails" className="layoutContainer">
                    <PageTitle
                        title={this.props.dashboard.header.title}
                        showFullScreen={this.props.dashboard.header.showFullScreen}
                    />
                    <Dashboard settings={this.props.dashboard.dashboardContent.settings}></Dashboard>
                </div>
            </div>
        );
    }
}
