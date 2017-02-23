<template>
    <div class="panel panel-default">
        <div class="panel-heading"><h3>Realtime Comment</h3></div>
        <div class="panel-body">
            <form @submit="onCreate">
                <div class="form-group">
                    <input type="text" class="form-control input-sm" name="author" v-model="author" placeholder="Name">
                </div>
                        
                <div class="form-group">
                    <textarea type="text" class="form-control input-sm" name="text" v-model="text" placeholder="Put here your text">
                    </textarea>
                </div>
                        
                <div class="form-group text-right">   
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="submitDisabled">Submit</button>
                </div>
            </form>
                            
            <div :data-id="comment.id" class="comment" v-if="showComment" v-for="(comment, index) in comments" :key="comment.id">
                <h3>{{ comment.author }}</h3>
                <p style="white-space: pre">{{ comment.text }}</p>
                <small>Postdate: {{ comment.created_at }}</small>
                <p><span class="btn btn-danger text-muted" @click="onDelete(comment.id)">Delete</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comments: [],
                text: '',
                author: '',
                showComment: false,
                submitDisabled: true
            }
        },
        watch: {
            'text': function(value) {
                if (value.length && this.author.length >= 1) {
                    this.submitDisabled = false
                } else {
                    this.submitDisabled = true
                }
            }
        },
        mounted() {
            this.getMessages()
            setInterval(function() {
                this.getMessages();
            }.bind(this), 5000);
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
                            this.comments = result
                        } else {
                            this.showComment = true
                            this.comments = result
                        }
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
                    success: function(result) {
                        if (result == 'error') {
                            alert('Invalid data format please try again!')
                        } else {
                            this.text = ''
                            this.author = ''
                            this.getMessages();
                        }
                    }
                })
            },
            onDelete: function(id) {
                $.ajax({
                    context: this,
                    type: 'DELETE',
                    url: '/api/comment/' + id,
                    success: function(result) {
                        this.getMessages();
                    }
                })
            }
        }
    }
</script>