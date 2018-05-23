var HTML2Image = function(dom){
    if(!dom instanceof HTMLElement) return;
    this.wrapper = dom
    this.down = null;
    this.imgData = '';
    this.init();
};
HTML2Image.prototype = {
    init(){
        this.importScript();
    },
    importScript(){
        var self = this;
        let scriptArray = ["https://cdn.bootcss.com/jquery/3.3.1/jquery.js", "https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js"];
        let num = 0;
        for(var i=0;i<scriptArray.length;i++){
            let jsLink = document.createElement('script');
            jsLink.type = "text/javascript";
            jsLink.src = scriptArray[i] + '?time=' + new Date().getTime();
            document.querySelector('body').appendChild(jsLink);
            jsLink.onload = function(){
                num++;
                if(num == scriptArray.length){
                    self.html2canvas(self.wrapper);
                }
            };
        }
    },
    html2canvas(wrapper){
        var self = this;
        html2canvas(wrapper, {
            background: '#fff',
            useCORS: true,
            allowTaint: true
        }).then((canvas) => {
            self.imgData = canvas.toDataURL('image/png');
            self.saveToLoacal();
        });
    },
    saveToLoacal(){
        var self = this;
        this.down = document.createElement('a');
        this.down.id = 'down';
        this.down.download = new Date().getTime() + '.png';
        document.querySelector('body').appendChild(self.down);
        console.log(this.imgData)
        this.down.href = this.imgData;
        this.down.click();
    }
};