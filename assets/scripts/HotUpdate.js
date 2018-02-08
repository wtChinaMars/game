cc.Class({
    extends: cc.Component,

    properties: {
        updatePanel: {
            default: null,
            type: cc.Node
        },
        manifestUrl: {
            default: null,
            url: cc.RawAsset
        },
        percent: {
            default: null,
            type: cc.Label
        },
        info: {
            default: null,
            type: cc.Label
        },
        _updating: false,
        _canRetry: false,
        jindutiao:cc.ProgressBar,
    },

    checkCb: function (event) {
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.info.string += "No local manifest file found, hot update skipped.\n";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                //this.info.string += "Fail to download manifest file, hot update skipped1.\n";
                this.info.string += "下载 manifest 文件失败, 跳过热更新.\n";
                cc.eventManager.removeListener(this._checkListener);
                this._checkListener = null;
                this._updating = false;
                this.checkUpdate();
                this.info.string += "重新尝试下载...\n";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //this.info.string = "Already up to date with the latest remote version.\n";
                this.info.string += "游戏不需要游戏更新。\n";
                cc.director.loadScene("start");
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                //this.info.string = 'New version found, please try to update.';
                this.info.string += '找到新版本，尝试更新。\n';
                this.updatePanel.active = true;
                this.percent.string = '00.00%';
                break;
            default:
                return;
        }

        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        this._updating = false;

        if(event.getEventCode()==jsb.EventAssetsManager.NEW_VERSION_FOUND)
            this.hotUpdate();
    },

    updateCb: function (event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.info.string += 'No local manifest file found, hot update skipped.\n';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                //this.updatePanel.byteProgress.progress = event.getPercent() / 100;
                //this.updatePanel.fileProgress.progress = event.getPercentByFile() / 100;
                var percent = event.getPercent().toFixed(2);

                var msg = event.getMessage();
                if (msg) {
                    this.info.string += 'Updated file: ' + msg+'\n';
                    cc.log(event.getPercent().toFixed(2) + '% : ' + msg);
                }

                var sum = i*12.8;
                console.log(sum);
                var sss=percent*100;
                this.percent.string = parseInt(sss) + '%';
                var sss=parseInt(sss);
                var jindu = sss*9.8;
                this.jindutiao.totalLength = parseInt(jindu);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.info.string += '下载 manifest 文件失败, 跳过热更新.\n';
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //this.info.string += 'Already up to date with the latest remote version.\n';
                this.info.string += "游戏不需要游戏更新。\n";
                cc.director.loadScene("start");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.info.string += '更新完成. ' + event.getMessage()+'\n';
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.info.string += '更新失败. ' + event.getMessage()+'\n';
                //this.updatePanel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;
                this.retry();
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.info.string += 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage()+'\n';
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.info.string += event.getMessage();
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));

            this.info.string += "游戏资源更新完毕\n";
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.game.restart();
        }
    },

    retry: function () {
        if (!this._updating && this._canRetry) {
            //this.updatePanel.retryBtn.active = false;
            this._canRetry = false;

            this.info.string += 'Retry failed Assets...\n';
            this._am.downloadFailedAssets();
        }
    },

    checkUpdate: function () {
        if (this._updating) {
            this.info.string += 'Checking or updating ...\n';
            return;
        }
        if (!this._am.getLocalManifest().isLoaded()) {
            this.info.string += 'Failed to load local manifest ...\n';
            return;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);

        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function () {
        if (this._am && !this._updating) {
            this.info.string += '开始更新游戏资源。\n';
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            this._failCount = 0;
            this._am.update();
            //this.updatePanel.updateBtn.active = false;
            this._updating = true;
        }
    },

    // use this for initialization
    onLoad: function () {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }
        this.info.string += "检查游戏资源...\n";
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'doulegame-remote-asset');
        cc.log('Storage path for remote asset : ' + storagePath);
        this.info.string += storagePath + "\n";
        // cc.log('Local manifest URL : ' + this.manifestUrl);
        this._am = new jsb.AssetsManager(this.manifestUrl, storagePath);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.retain();
        }

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this._am.setVersionCompareHandle(function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        });

        var panel = this.panel;
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                //this.info.string += "Verification passed : " + relativePath+'\n';
                return true;
            }
            else {
                //this.info.string += "Verification passed : " + relativePath + ' (' + expectedMD5 + ')\n';
                return true;
            }
        });

        //this.panel.info.string = 'Hot update is ready, please check or directly update.';

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            //this.panel.info.string = "Max concurrent tasks count have been limited to 2";
        }

        //this.updatePanel.fileProgress.progress = 0;
        //this.updatePanel.byteProgress.progress = 0;
        this.percent.string = '00.00%';
        if (this._am.getLocalManifest().isLoaded())
        {
            this.checkUpdate();
        }
        this.info.string += "检查游戏资源中，请稍候...\n";
    },

    onDestroy: function () {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    }
});
