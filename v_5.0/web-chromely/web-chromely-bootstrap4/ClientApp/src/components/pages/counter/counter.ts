import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CounterComponent extends Vue {
    public currentcount: number = 0;

    private incrementCounter() {
        this.currentcount++;
    }
}
