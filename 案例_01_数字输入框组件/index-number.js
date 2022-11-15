function isNumber (value) {
    return (/(^\-?[0-9)\+\.{1}\d+$)|(^\-?[1-9][0-9]*$)|(^\-?0{1}$)/).test(value + '');
}

Vue.component("input-number", {
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    template:
    '<div class="input-number">' + 
    '<input type="text" :value="current" @input="handleBlur"></input>' +
    '&nbsp;&nbsp;&nbsp;' + 
    '<button @click="handleDown" :disabled="current <= min">-</button>' +
    '&nbsp;&nbsp;&nbsp;' + 
    '<button @click="handleUp" :disabled="current >= max">+</button>' +
    '</div>',
    data: function() {
        return {
            current: this.value
        }
    },
    // 侦听器, 监听变量 current 的变化, 同步到父组件 current 中!
    watch: {
        current: function(val) {
            console.log('watch current method invoke, val is :' + val);
            // TODO: 起到 同步外部数据的作用!
            this.$emit('input', val);
        },
    },
    methods: {
        handleDown: function() {
            if(this.current <= this.min) {
                // do nothing
            } else {
                this.current --;
            }
        },
        handleUp: function() {
            if(this.current >= this.max) {
                // do nothing
            } else {
                this.current ++;
            }
        },
        handleBlur: function(event) {
            var val = event.target.value;
            if(isNumber(val)) {
                val = Number(val);
                if(val >= this.max) {
                    this.current = this.max;
                } else if(val <= this.min){
                    this.current = this.min;
                } else {
                    this.current = val;
                }
            }
        },
        updateValue: function(val) {
            if(val >= this.max) val = this.max;
            if(val <= this.min) val = this.min;
            this.current = val;
        }
    },
    mounted() {
        this.updateValue(this.value);
    },
});
