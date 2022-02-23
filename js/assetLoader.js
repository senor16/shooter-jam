class AssetLoader {
    /**
     * Create an instance of Assetloader
     */
    constructor() {
        this.listImagePath = [];
        this.listImage = [];
        this.loadedImage = 0;

        this.listAudioPath = [];
        this.listAudio = [];
        this.loadedAudio = 0;

        this.listFontPath = [];
        this.loadedFonts = 0;

        this.callback = null
    }

    /**
     * Add a font to be loaded
     * @param {String} pName - Name of the font
     * @param {String} pPath - Path to the font
     */
    addFont(pName, pPath) {
        let font = {
            name: pName,
            path: pPath
        };
        this.listFontPath.push(font);
    }

    /**
     * Add an image to be loaded
     * @param {String} pPath - Path to the image
     */
    addImage(pPath) {
        this.listImagePath.push(pPath)
    }

    /**
     * Add an audio to be loaded
     * @param {String} pPath - Path to the audio
     */
    addAudio(pPath) {
        this.listAudioPath.push(pPath)
    }

    /**
     * Get the number of images to be loaded
     * @returns {number}
     */
    get getTotalImage() {
        return this.listImagePath.length
    }

    /**
     * Get the number of images which has been loaded
     * @returns {number}
     */
    get getLoadedImage() {
        return this.loadedImage
    }

    /**
     * Get an reference to the loaded images
     * @returns {Array}
     */
    get getListImages() {
        return this.listImage
    }

    /**
     * Get an image which has been loaded
     * @param pPath - Path to the image
     * @returns {Image}
     */
    getImage(pPath) {
        return this.listImage[pPath]
    }

    /**
     * Execute a callback function when all the assets have been loaded
     */
    onFinished() {
        if (this.getRatio() === 1)
            this.callback()
    }

    /**
     * Actions to do when an image get loaded
     */
    onLoadedImage() {
        this.loadedImage++;
        console.log("Loading images...  " + this.loadedImage + " / " + this.listImagePath.length);
        if (this.loadedImage === this.listImagePath.length) {
            this.onFinished()
        }
    }

    /**
     * Actions to do when a font get loaded
     */
    onLoadedFont(font) {
        document.fonts.add(font);
        this.loadedFonts++;
        console.log("Loading fonts...   " + this.loadedFonts + " / " + this.listFontPath.length);
        if (this.loadedFonts === this.listFontPath.length) {
            this.onFinished()
        }
    }

    /**
     * Actions to do when an audio get loaded
     */
    onLoadedAudio() {
        this.loadedAudio++;
        console.log("Loading audio...   "+ this.loadedAudio + " / " + this.listAudioPath.length);
        if (this.loadedAudio === this.listAudioPath.length) {
            this.onFinished()
        }
    }

    /**
     * Get an audio which has been loaded
     * @param {String} pPath - Path to the audio
     * @returns {Audio}
     */
    getAudio(pPath) {
        return this.listAudio[pPath]
    }

    /**
     * Start loading the assets
     * @param {CallableFunction} pCallback - Callback function called when all the assets are loaded
     */
    start(pCallback) {
        this.callback = pCallback;

        // Loading Images
        this.listImagePath.forEach(path => {
            let image = new Image();
            image.onload = this.onLoadedImage.bind(this);
            image.src = path;
            this.listImage[path] = image
        });

        // Loading Fonts
        this.listFontPath.forEach(ft => {
            let font = new FontFace(ft.name, 'url("' + ft.path + '")');
            font.load().then(this.onLoadedFont.bind(this));
        });

        // Loading Audio
        this.listAudioPath.forEach(path => {
            let audio = new Audio(path);
            audio.onloadeddata = this.onLoadedAudio.bind(this);
            this.listAudio[path] = audio
        })
    }

    /**
     * Get the ratio of loaded assets
     * @returns {number}
     */
    getRatio() {
        return (this.loadedImage + this.loadedFonts + this.loadedAudio) / (this.listImagePath.length + this.listFontPath.length + this.listAudioPath.length)
    }


}
