import ErrorScreen from "@components/ErrorScreen";
import Button from "@src/components/Button";
import useViewModel from "./viewModel";
import DashboardOptionsPanel from "@src/spotify/components/DashboardOptionsPanel";
import FiltersPanel from "@src/spotify/components/filters/filtersPanel/view";

export default function Dashboard () {
  const {
    optionsPanelProps,
    userPlaylists,
    userProfile,
    filtersPanelProps,
    sourceCheckboxToggled,
    submit,
  } = useViewModel();

  if (!userPlaylists || !userProfile) {
    return (
      <ErrorScreen
        message="loading"
      ></ErrorScreen>
    );
  }

  return (
    <div>
      <div className="bg-primary">
        <div className="text-xl font-bold m-auto max-w-fit py-2">
          Create A Playlist
        </div>
      </div>
      <div
        className="w-1/3 m-auto bg-dark-accent p-1 mt-1"
      >
        <div className="text-center bg-light p-2 m-1">
          <Button
            value="Submit"
            onClick={submit}
            className="w-1/2"
          ></Button>  
        </div>
        <DashboardOptionsPanel
          {...optionsPanelProps}
          userPlaylists={userPlaylists}
          userId={userProfile.id}
        />
        <FiltersPanel
          {...filtersPanelProps}
        ></FiltersPanel>
        <div
          className="bg-light p-2 m-1"
        >
          <div className="text-l font-bold m-auto max-w-fit">
            Sources
          </div>
          <ul>
            {
              userPlaylists.map((playlist) => (
                <li
                  key={playlist.id}
                >
                  <input type="checkbox"
                    onChange={(e) => sourceCheckboxToggled((e.target).checked, playlist)}
                  ></input>
                  <span className="pl-1">{playlist.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}