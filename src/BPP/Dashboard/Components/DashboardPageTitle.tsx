import { IHeader } from "../../Interfaces";

export const DashboardPageTitle = ({ title, showFullScreen }: IHeader) => (
    <div className="py-2.5 px-4 rounded-tl-sm rounded-tr-sm w-full flex justify-between border-b border-gray-200">
        <div className="max-w-full flex flex-col gap-2 flex-grow-2">
            <span data-cy="title" className="font-light break-words text-[28px]">
                {title}
            </span>
        </div>

        <div className="pull-right hidden-print tools-pull-right">
            <div className="btn-group toolbarButtons">
                {showFullScreen && (
                    <div className="btn-group btn-dashboard-fullscreen">
                        <button title="" data-original-title="Fullscreen" className="btn btn-item btn-fullscreen">
                            <span className="fal fa-expand-arrows-alt"></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
);
