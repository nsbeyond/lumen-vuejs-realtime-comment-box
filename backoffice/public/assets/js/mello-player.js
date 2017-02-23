var playerInstance = jwplayer("melloPlayer")
jwplayer.key="VdpQifC79bNcaZYPA/rlxA/oNghy9iNXgMPKqGNO9uM=";
playerInstance.setup({
        //- "abouttext": "Mello player",
        //- "aboutlink": "http://twinsynergy.co.th",
        //- "file": "/assets/videos/test.mp4",
        file: "https://mello-staging.s3.amazonaws.com/uploads/converted_video/74/output.m3u8",
//         file: "http://hthlvideolesson.s3.amazonaws.com/F1WrG1/F1WrG1L1/F1WrG1L1-1PFC_HTHL_MP4.mp4",
        // image: "/assets/videos/poster1.jpg",
        image: "img/html5-video-player.jpg",
        height: '100%',
        width: '100%',
        stretching: 'fill',
        //- "title": 'แฟนเดย์ แฟนกัน วันเดียว',
        //- "logo": {
        //-     file: "assets/images/logo-menu-top.png",
        //-     hide: true,
        //-     position: "top-left"
        //- },
        //skin: {
        //    name: "jwmello"
        //},
        tracks: [{
            file: "http://188.166.210.195/images/en1.srt",
            label: "English",
            kind: "captions",
            "default": true
        },{
            file: "http://188.166.210.195/images/th1.srt",
            kind: "captions",
            label: "Thai"
        }],
        captions: {
            color: '#fff',
            fontSize: 10,
            backgroundOpacity: 50
        }
});
