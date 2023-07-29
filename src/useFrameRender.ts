import { onMounted, ref } from "@vue/composition-api";


const Fps = 60;
const Second = 1000;

const toFrame = (frame: number) => {
    let _resolve = (value: any) => { };
    const p = new Promise(resolve => {
        _resolve = resolve;
    });

    let start = Date.now();
    const run = (count: number) => {
        if (count < 0) {
            _resolve(true);
            return p;
        }
        const FrameTime = Math.floor(Second / Fps);
        requestAnimationFrame(() => {
            if (Date.now() - start >= FrameTime) {
                start = Date.now();
                run(--count);
            } else {
                run(count);
            }

        });
    };
    run(frame);
    return p;
};


/**
 * 一个分帧渲染的hook
 * 当前帧为第0帧
 * useFrameRender(1)  下一帧渲染
 * useFrameRender(10) 在第10帧渲染
 */
export const useFrameRender = (frame = 1) => {
    const nextFrame = ref(false);
    if (frame <= 0) {
        nextFrame.value = true;
        return { nextFrame };
    }
    toFrame(frame).then(() => {
        nextFrame.value = true;
    });
    return { nextFrame };
};

