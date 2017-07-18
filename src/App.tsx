require('script-loader!./apps.ca.en.js');
import * as React from "react";
import { CastAppModel, CastApp } from "./CastApp";
import * as fuzzy from 'fuzzy';

export default class App extends React.Component<{}, { query: string }> {

    state = {
        query: ""
    };

    get apps(): CastAppModel[] {
        return (window as any).apps as CastAppModel[];
    }

    get query(): string {
        return this.state.query;
    }

    get categories(): string[] {
        return ["games"];
    }

    get filteredApps(): CastAppModel[] {
        const options = {
            extract(el: CastAppModel) {
                return `
                ${el.name}
                ${el.description}
                ${el.category}
                `; 
            }
        }
        const results = fuzzy.filter(this.query, this.apps, options);
        // console.log(results);
        return results.map(result => result.original);
    }

    render() {
        return (
            <div>
                <h1>Cast Apps Search</h1>
                <div>Finally, you can search for Chromecast apps!</div>
                <input value={this.query} placeholder="Search!" onChange={this.onQueryChange.bind(this)} />
                <hr/>
                <div>
                    Showing {this.filteredApps.length} app(s).
                </div>
                <div>
                    {this.filteredApps.map((app, index) => (
                        <CastApp key={index} app={app} />
                    ))}
                </div>
            </div>
        );
    }

    private onQueryChange(event: any) {
        const { value } = event.target;
        this.setState({
            query: value
        });
    }
}
