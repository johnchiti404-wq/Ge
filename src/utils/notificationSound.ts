class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private unlocked = false;

  constructor() {
    this.sounds.message = new Audio('/sounds/message.mp3');
    this.sounds.arrived = new Audio('/sounds/arrived.mp3');

    Object.values(this.sounds).forEach((audio) => {
      audio.preload = 'auto';
      audio.volume = 0.6;
    });

    const unlock = () => {
      if (this.unlocked) return;
      this.unlocked = true;

      Object.values(this.sounds).forEach((audio) => {
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch(() => {});
      });

      window.removeEventListener('pointerdown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
  }

  play(name: 'message' | 'arrived') {
    const audio = this.sounds[name];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error(`Error playing ${name} sound:`, error);
    });
  }
}

export const soundManager = new SoundManager();
