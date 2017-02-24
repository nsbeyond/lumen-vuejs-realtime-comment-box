<template>
    <div class="panel panel-default">
        <div class="panel-heading"><h3>Realtime Comment</h3></div>
        <div class="panel-body">
            <router-link :to="{ path: '/' }">Home</router-link>
            <router-link :to="{ path: '/comment' }">Comment</router-link>
            <form @submit="onCreate">
                <div class="form-group">
                    <input type="text" class="form-control input-sm" name="author" v-model="author" placeholder="Name">
                </div>

                <div class="form-group">
                    <textarea type="text" class="form-control input-sm" name="text" v-model="text" placeholder="Put here your text">
                    </textarea>
                </div>
     
                <div class="form-group text-right">   
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="submitDisabled">{{ sendText }}</button>
                </div>
            </form>

            <div name="component-fade" is="transition-group" mode="out-in" v-if="showComment">
                <div :data-id="comment.id" class="comment" v-if="showComment" v-for="(comment, index) in comments" :key="comment.id">
                    <h3>{{ comment.author }}</h3>
                    <p style="white-space: pre">{{ comment.text }}</p>
                    <small>Postdate: {{ comment.created_at }}</small>
                    <p><button type="button" class="btn btn-danger text-muted" @click="onDelete(comment.id)" :disabled="deleteDisabled">{{ deleteText }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: '',
                author: '',
                comments: [],
                showComment: false,
                submitDisabled: true,
                deleteDisabled: false,
                sendText: 'Send',
                deleteText: 'Delete'
            }
        },
        mounted() {
            this.getMessages()
            setInterval(function() {
                this.getMessages()
            }.bind(this), 3000)
        },
        watch: {
            'author': function(value) {
                this.submitDisabled = (value.length >= 1 && this.text.length >= 1) ? false : true
            },
            'text': function(value) {
                this.submitDisabled = (value.length >= 1 && this.text.length >= 1) ? false : true
            }
        },
        methods: {
            getMessages: function() {
                $.ajax({
                    context: this,
                    type: 'GET',
                    url: '/api/comment',
                    success: function(result) {
                        if (result == 'error') {
                            this.showComment = false
                        } else {
                            this.showComment = true
                            this.comments = result
                            this.deleteDisabled = false
                            this.sendText = 'Send'
                            this.deleteText = 'Delete'
                        }
                    }
                })
            },
            onDelete: function(id) {
                $.ajax({
                    context: this,
                    type: 'DELETE',
                    url: '/api/comment/' + id,
                    beforeSend: function() {
                        this.deleteDisabled = true
                        this.deleteText = 'Deleting...'
                    },
                    success: function(result) {
                        this.getMessages()
                    }
                })
            },
            onCreate: function(e) {
                e.preventDefault()
                $.ajax({
                    context: this,
                    type: 'POST',
                    data: {
                        author: this.author,
                        text: this.text
                    },
                    url: '/api/comment',
                    beforeSend: function() {
                        this.submitDisabled = true
                        this.sendText = 'Sending...'
                    },
                    success: function(result) {
                        if (result == 'error') {
                            alert('Invalid data format please try again!')
                        } else {
                            this.getMessages();
                            this.text = ''
                            this.author = ''
                        }
                    }
                })
            }
        }
    }
</script>