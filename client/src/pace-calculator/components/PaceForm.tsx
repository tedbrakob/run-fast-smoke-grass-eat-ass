import { Component } from "react";
import { paceDistanceOptions } from "../../static/distances";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

type Props = {
  error: boolean;
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;

  selectedDistanceIndex: string;

  handleFieldChange: (field: string, value: string) => void;
};

export default class PaceForm extends Component <Props> {
  render () {
    return (
      <div className="mx-auto">
        <table>
          <thead>
            <tr>
              <td className="smallText" align="center">hours</td>
              <td className="smallText" align="center">mins</td>
              <td className="smallText" align="center">secs</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <TextInput size={2} maxLength={2}
                  error={this.props.error}
                  inputMode="numeric"
                  type="number" pattern="\d*"
                  value={this.props.timeHours ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeHours', event.target.value)}}
                />
              </td>
              <td align="center">
                <TextInput size={2} maxLength={2}
                  error={this.props.error}
                  inputMode="numeric"
                  type="number" pattern="\d*"
                  value={this.props.timeMinutes ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeMinutes', event.target.value)}}
                />
              </td>
              <td align="center">
                <TextInput size={5} maxLength={6}
                  error={this.props.error}
                  inputMode="decimal"
                  type="number" pattern="\d*"
                  value={this.props.timeSeconds ?? ''}
                  onChange={(event) => {this.props.handleFieldChange('paceTimeSeconds', event.target.value)}}
                />
              </td>
            </tr>
            <tr>
              <td>Per</td>
              <td colSpan={2}>
                <Select name="punit"
                  onChange={(event) => {this.props.handleFieldChange('selectedPaceDistanceIndex', event.target.value)}}
                  value={this.props.selectedDistanceIndex}>
                    {paceDistanceOptions.map((option, index) => (
                      <option key={index} value={index}>
                        {option.label}
                      </option>
                    ))}
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}