// Should be moved to the SDK probably
import * as React from "react";
import { IDashboard, IHeader, IProjectSettings } from "../../Interfaces";

export class PageTitle extends React.Component<IHeader> {
    settings: IProjectSettings;

    render() {
        return (
            <div className="panel-heading itemTitleBar addedTitle">
                <div className="itemTitle pull-left">
                    <span data-cy="title" className="refTitle">
                        {this.props.title}
                    </span>
                </div>

                <div className="pull-right hidden-print tools-pull-right">
                    <div className="btn-group toolbarButtons">
                        {this.props.showFullScreen && (
                            <div className="btn-group btn-dashboard-fullscreen">
                                <button
                                    title=""
                                    data-original-title="Fullscreen"
                                    className="btn btn-item btn-fullscreen"
                                >
                                    <span className="fal fa-expand-arrows-alt"></span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
