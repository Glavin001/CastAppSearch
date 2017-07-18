require('script-loader!./apps.ca.en.js');
import * as React from "react";
import { CastAppModel } from "./CastApp";
import * as fuzzy from 'fuzzy';

export class CastApp extends React.Component<{ app: CastAppModel }, {}> {

    get app() {
        return this.props.app;
    }

    get name() {
        return this.app.name;
    }

    get description() {
        return this.app.description;
    }

    get supportsAndroid(): boolean {
        return Boolean(this.androidId);
    }

    get androidId(): string {
        return this.app.android_package_name;
    }

    get supportsIOS(): boolean {
        return Boolean(this.iosId);
    }

    get iosId(): string {
        return this.app.ios_itunes_id;
    }

    get supportsChrome(): boolean {
        return Boolean(this.chromeWebsiteUrl);
    }

    get chromeWebsiteUrl(): string {
        return this.app.chrome_website_url;
    }

    get category() {
        return this.app.category;
    }

    render() {
        return (
            <div>
                <h2>{this.name} ({this.category})</h2>
                <div>{this.description}</div>
                {(this.supportsAndroid) && (
                    <span>
                        <a href={`https://play.google.com/store/apps/details?id=${this.androidId}&hl=en`}>
                            Android
                        </a>
                        <span>&nbsp;</span>
                    </span>
                )}
                {(this.supportsIOS) && (
                    <span>
                        <a href={`https://itunes.apple.com/ca/app/id${this.iosId}`}>
                            iOS
                        </a>
                        <span>&nbsp;</span>
                    </span>
                )}
                {(this.supportsChrome) && (
                    <span>
                        <a href={this.chromeWebsiteUrl}>
                            Chrome
                        </a>
                        <span>&nbsp;</span>
                    </span>
                )}
            </div>
        );
    }
}


export interface CastAppModel {
    name: string;
    featured: number;
    icon_url: string;
    description: string;
    category: string;
    android_package_name?: string;
    ios_itunes_id?: string;
    chrome_website_url?: string;
};